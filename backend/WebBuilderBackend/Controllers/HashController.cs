using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Net.Http;
using System.Net.Http.Headers;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebBuilderBackend.Controllers
{
    [ApiController]
    [Route("api/hash")]
    public class HashController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] dynamic data)
        {
            try
            {
                string jsonData = data.ToString();
                string key = "ff06361a-eac0-4d19-83be-bebceca54b64";
                string hash = CalculateHMACSHA256(jsonData, key);
                //return Ok(hash);
                var Timestamp = new DateTimeOffset(DateTime.UtcNow).ToUnixTimeSeconds();
                string apiUrl = "https://api.sandbox.paynow.pl/v1/payments";
                string apiKey = "f8a4e485-591c-4764-ba41-bd125e6ae4b1";
                string signature = hash;
                string idempotencyKey = Timestamp.ToString();

                var requestData = data;

                var httpClient = new HttpClient();
                httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                httpClient.DefaultRequestHeaders.Add("Api-Key", "f8a4e485-591c-4764-ba41-bd125e6ae4b1");
                httpClient.DefaultRequestHeaders.Add("Signature", hash);
                httpClient.DefaultRequestHeaders.Add("Idempotency-Key", idempotencyKey); 
                httpClient.DefaultRequestHeaders.Add("Host", "api.sandbox.paynow.pl");
                httpClient.DefaultRequestHeaders.Add("Accept", "*/*");
                var httpContent = new StringContent(data.ToString(), Encoding.UTF8, "application/json");
                var response = await httpClient.PostAsync(apiUrl, httpContent);
                var responseContent = await response.Content.ReadAsStringAsync();

                return Ok(responseContent);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        private string CalculateHMACSHA256(string data, string key)
        {
            byte[] dataBytes = Encoding.UTF8.GetBytes(data);
            byte[] keyBytes = Encoding.UTF8.GetBytes(key);

            using (HMACSHA256 hmac = new HMACSHA256(keyBytes))
            {
                byte[] hashBytes = hmac.ComputeHash(dataBytes);
                return Convert.ToBase64String(hashBytes);
            }
        }
    }
}