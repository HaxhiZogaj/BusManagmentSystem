using BusMNG.Models;

namespace BusMNG.ViewModels
{
    public class RezervimetViewModel
    {

        public int? RezervimiId { get; set; }

        public int? PasagjeriId { get; set; }

        public int? OrariId { get; set; }

        public int? NumriVendit { get; set; }

        public string Statusi { get; set; }

        public DateTime? DataKrijimit { get; set; }

        public virtual ICollection<Biletat> Biletats { get; set; } = new List<Biletat>();

        public virtual Oraret Orari { get; set; }

        public virtual Pasagjerët Pasagjeri { get; set; }
    }
}
