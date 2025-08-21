using BusMNG.Models;

namespace BusMNG.ViewModels
{
    public class BiletatViewModel
    {
        public int? BiletaId { get; set; }

        public int? RezervimiId { get; set; }

        public string NumriBiletës { get; set; }

        public decimal Çmimi { get; set; }

        public DateTime? DataLëshimit { get; set; }

        public virtual Rezervimet Rezervimi { get; set; }


        public string? rezervimiName { get; set; }
    }
}
