using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebBuilderBackend.Data;
using WebBuilderBackend.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebBuilderBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApiContext _context;

        public UsersController(ApiContext context) {
            _context = context;
        }


        [HttpPost]
        public JsonResult CreateEdit(Users user) {
            if (user.Id == 0) {
                _context.Users.Add(user);
            } else {
                var userInDb = _context.Users.Find(user.Id);

                if (userInDb == null) {
                    return new JsonResult(NotFound());
                }
                userInDb = user;
            }

            _context.SaveChanges();
            return new JsonResult(Ok(user));
        }
        // GET: api/values
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public JsonResult GetAll()
        {
            var result = _context.Users.ToList();

            return new JsonResult(Ok(result));
        }

        //// GET api/values/5
        [HttpGet("{email}")]
        public IActionResult Get(string email)
        {
            var result = _context.Users.FirstOrDefault(p => p.Email == email);
            if (result == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(result);
            }
        }


        //// POST api/values
        //[HttpPost]
        //public void Post([FromBody]string value)
        //{
        //}

        //// PUT api/values/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            var result = _context.Users.Find(id);

            if (result == null)
            {
                return new JsonResult(NotFound());
            }

            _context.Users.Remove(result);
            _context.SaveChanges();
            return new JsonResult(NoContent());
        }
    }
}

