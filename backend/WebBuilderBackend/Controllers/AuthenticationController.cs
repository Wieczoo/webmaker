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
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Google;

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
            else
            {
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
                         new Claim(ClaimTypes.Role,user.Role),
                         new Claim("Role",user.Role)
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

        [HttpPost("Users")]
        public IActionResult Users([FromBody] Users user)
        {
            if (user is null)
            {
                return BadRequest("Invalid user request!!!");
            }

            // Sprawdź, czy użytkownik o podanym adresie e-mail już istnieje w bazie danych
            Users existingUser = _context.Users.SingleOrDefault(x => x.Email == user.Email);

            if (existingUser != null)
            {
                if (user.Email == existingUser.Email && user.Password == existingUser.Password)
                {
                    // Użytkownik istnieje i dane logowania są poprawne

                    var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(ConfigurationManager.AppSetting["JWT:Secret"]));
                    var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                    var tokeOptions = new JwtSecurityToken(
                        issuer: ConfigurationManager.AppSetting["JWT:ValidIssuer"],
                        audience: ConfigurationManager.AppSetting["JWT:ValidAudience"],
                        claims: new List<Claim>() {
                    new Claim(ClaimTypes.Name, user.Email),
                    new Claim(ClaimTypes.Role, existingUser.Role),

                    new Claim("Role", existingUser.Role),
                 new Claim("Email", existingUser.Email)

                        },
                        expires: DateTime.Now.AddMinutes(6),
                        signingCredentials: signinCredentials
                    );
                    var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                    return Ok(new JWTTokenResponse { Token = tokenString });
                }
            }
            else
            {
                // Użytkownik nie istnieje, dodaj nowego użytkownika na podstawie danych przekazanych w parametrze

                Users newUser = user;
                user.Role = "User";
                _context.Users.Add(newUser);
                _context.SaveChanges();

                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(ConfigurationManager.AppSetting["JWT:Secret"]));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var tokeOptions = new JwtSecurityToken(
                    issuer: ConfigurationManager.AppSetting["JWT:ValidIssuer"],
                    audience: ConfigurationManager.AppSetting["JWT:ValidAudience"],
                    claims: new List<Claim>() {
                new Claim(ClaimTypes.Name, newUser.Email),
                new Claim(ClaimTypes.Role, newUser.Role),

                new Claim("Role", newUser.Role),
                 new Claim("Email", newUser.Email)


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

