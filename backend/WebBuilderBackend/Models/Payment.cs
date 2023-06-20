using System;
namespace WebBuilderBackend.Models
{
	public class Payment
	{
        public string Id { get; set; }
        public string? status { get; set; }
        public string? elementId { get; set; }
        public string? buyerEmail { get; set; }
    }
}

