using BusMNG.Models;
using BusMNG.Repositories.Interfaces;

namespace BusMNG.Repositories
{
    public class ShoferRepository : Repository<Shoferët>, IShoferRepository
    {
        public ShoferRepository(BusKosovaContext context) : base(context) { }
    }
}
