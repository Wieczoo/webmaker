using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebBuilderBackend.Models;
using WebBuilderBackend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace WebBuilderBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly ApiContext _context;

        public AuthenticationController(ApiContext context)
        {
            _context = context;
        }



        [HttpPost("login")]
        public IActionResult Login([FromBody] Login login)
        {
            if (login is null)
            {
                return BadRequest("Invalid user request!!!");
            }
            else {
                Users user = _context.Users.SingleOrDefault(user => user.Email == login.Email);
                if (login.Email == user.Email && login.Password == user.Password)
                {

                    var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(ConfigurationManager.AppSetting["JWT:Secret"]));
                    var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                    var tokeOptions = new JwtSecurityToken(
                        issuer: ConfigurationManager.AppSetting["JWT:ValidIssuer"],
                        audience: ConfigurationManager.AppSetting["JWT:ValidAudience"],
                        claims: new List<Claim>() {
                         new Claim(ClaimTypes.Name,login.Email),
                         new Claim(ClaimTypes.Role,"Admin")
                        },
                        expires: DateTime.Now.AddMinutes(6),
                        signingCredentials: signinCredentials
                    );
                    var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                    return Ok(new JWTTokenResponse { Token = tokenString });

                }
                return Unauthorized();
            }
            
        }
    }
}

