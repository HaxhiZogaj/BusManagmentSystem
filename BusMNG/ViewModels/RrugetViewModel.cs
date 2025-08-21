using BusMNG.Models;

namespace BusMNG.ViewModels
{
    public class RrugetViewModel
    {

        public int? RrugaId { get; set; }

        public string Origjina { get; set; }

        public string Destinacioni { get; set; }

        public decimal Distanca { get; set; }

        public DateTime? DataKrijimit { get; set; }

        public virtual ICollection<Oraret> Orarets { get; set; } = new List<Oraret>();
    }
}
