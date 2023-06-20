using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebBuilderBackend.Controllers
{
    [ApiController]
    [Route("api/dotpay")]
    public class DotpayController : ControllerBase
    {
        private readonly string _filePath;

        public DotpayController(IWebHostEnvironment hostingEnvironment)
        {
            _filePath = Path.Combine(hostingEnvironment.WebRootPath, "dotpay.txt");
        }

        [HttpPost]
        public IActionResult Post([FromBody] dynamic data)
        {
            try
            {
                string json = Newtonsoft.Json.JsonConvert.SerializeObject(data);
                System.IO.File.AppendAllText(_filePath, json + "\n");
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}