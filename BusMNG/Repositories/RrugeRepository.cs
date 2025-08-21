using BusMNG.Models;
using BusMNG.Repositories.Interfaces;

namespace BusMNG.Repositories
{
    public class RrugeRepository : Repository<Rrugët>, IRrugeRepository
    {
        public RrugeRepository(BusKosovaContext context) : base(context) { }

    }
}
