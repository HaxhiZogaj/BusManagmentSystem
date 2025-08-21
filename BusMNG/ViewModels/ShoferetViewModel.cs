using BusMNG.Models;

namespace BusMNG.ViewModels
{
    public class ShoferetViewModel
    {

        public int? ShoferiId { get; set; }

        public string Emri { get; set; }

        public string NumriLicencës { get; set; }

        public int? BusId { get; set; }

        public DateTime? DataKrijimit { get; set; }

        public virtual Bus Bus { get; set; }
    }
}
