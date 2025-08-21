using BusMNG.Models;

namespace BusMNG.ViewModels
{
    public class OraretViewModel
    {

        public int? OrariId { get; set; }

        public int? BusId { get; set; }

        public int? RrugaId { get; set; }

        public DateTime KohaNisjes { get; set; }

        public DateTime KohaArritjes { get; set; }

        public string Statusi { get; set; }

        public DateTime? DataKrijimit { get; set; }

        public virtual Bus Bus { get; set; }

        public virtual ICollection<Rezervimet> Rezervimets { get; set; } = new List<Rezervimet>();

        public virtual Rrugët Rruga { get; set; }
    }
}
