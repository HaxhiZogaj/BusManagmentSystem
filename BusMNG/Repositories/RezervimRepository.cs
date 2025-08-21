using BusMNG.Models;
using BusMNG.Repositories.Interfaces;

namespace BusMNG.Repositories
{
    public class RezervimRepository : Repository<Rezervimet>, IRezervimRepository
    {
        public RezervimRepository(BusKosovaContext context) : base(context) { }
    }
}
