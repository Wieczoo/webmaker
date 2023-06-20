using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebBuilderBackend.Data;
using WebBuilderBackend.Models;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebBuilderBackend.Controllers
{
    [ApiController]
    [Route("api/payments")]
    public class PaymentsController : ControllerBase
    {
        private readonly ApiContext _context;

        public PaymentsController(ApiContext context)
        {
            _context = context;
        }

        // GET: api/values
        [HttpGet]
        //[Authorize(Roles = "Admin")]
        public JsonResult GetAll()
        {
            var result = _context.Payments.ToList();
            
            return new JsonResult(Ok(result));
        }

        // Create endpoint - POST /api/payments
        [HttpPost]
        public IActionResult CreatePayment([FromBody] Payment payment)
        {


            // Dodanie płatności do listy
            // _context.Payment.Add(payment);
            _context.Payments.Add(payment);
            _context.SaveChanges();
            // Zwrócenie odpowiedzi z utworzoną płatnością
            return Ok(payment);
        }

        // Read endpoint - GET /api/payments/{id}
        [HttpGet("{id}")]
        public IActionResult GetPayment(string id)
        {

            Payment payment = _context.Payments.FirstOrDefault(p => p.Id == id);

            // Sprawdzenie, czy płatność istnieje
            if (payment == null)
            {
                return NotFound();
            }

            // Zwrócenie płatności
            return Ok(payment);
        }

        // Update endpoint - PUT /api/payments/{id}
        [HttpPut("{id}")]
        public IActionResult UpdatePayment(string id, [FromBody] Payment updatedPayment)
        {
            // Wyszukiwanie płatności po identyfikatorze
            Payment payment = _context.Payments.FirstOrDefault(p => p.Id == id);

            // Sprawdzenie, czy płatność istnieje
            if (payment == null)
            {
                return NotFound();
            }

            // Aktualizacja właściwości płatności
            payment.status = updatedPayment.status;
            payment.elementId = updatedPayment.elementId;
            payment.buyerEmail = updatedPayment.buyerEmail;
            _context.SaveChanges();
            // Zwrócenie zaktualizowanej płatności
            return Ok(payment);
        }

        // Delete endpoint - DELETE /api/payments/{id}
        [HttpDelete("{id}")]
        public IActionResult DeletePayment(string id)
        {
            // Wyszukiwanie płatności po identyfikatorze
            Payment payment = _context.Payments.FirstOrDefault(p => p.Id == id);

            // Sprawdzenie, czy płatność istnieje
            if (payment == null)
            {
                return NotFound();
            }

            // Usunięcie płatności z listy
            _context.Payments.Remove(payment);

            // Zwrócenie potwierdzenia usunięcia
            return NoContent();
        }

    }
}

