
using BusMNG.Models;

namespace BusMNG.ViewModels
{
    public class BusViewModel
    {
        public int? BusId { get; set; }

        public string NumriTargës { get; set; }

        public int Kapaciteti { get; set; }

        public string Statusi { get; set; }

        public DateTime? DataKrijimit { get; set; }

        public virtual ICollection<Oraret> Orarets { get; set; } = new List<Oraret>();

        public virtual ICollection<Shoferët> Shoferëts { get; set; } = new List<Shoferët>();
    }
}
