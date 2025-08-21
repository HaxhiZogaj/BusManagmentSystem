using BusMNG.Models;

namespace BusMNG.ViewModels
{
    public class PasagjeretViewModel
    {

        public int? PasagjeriId { get; set; }

        public string Emri { get; set; }

        public string Email { get; set; }

        public string NumriTelefonit { get; set; }

        public DateTime? DataKrijimit { get; set; }

        public virtual ICollection<Rezervimet> Rezervimets { get; set; } = new List<Rezervimet>();
    }
}
