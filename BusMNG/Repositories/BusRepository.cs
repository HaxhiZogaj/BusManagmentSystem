using BusMNG.Models;
using BusMNG.Repositories.Interfaces;

namespace BusMNG.Repositories
{
    public class BusRepository : Repository<Bus>, IBusRepository
    {
        public BusRepository(BusKosovaContext context) : base(context) { }
    }
}
