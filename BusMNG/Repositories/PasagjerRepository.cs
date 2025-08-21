using BusMNG.Models;
using BusMNG.Repositories.Interfaces;

namespace BusMNG.Repositories
{
    public class PasagjerRepository : Repository<Pasagjerët>, IPasagjerRepository
    {
        public PasagjerRepository(BusKosovaContext context) : base(context) { }
    }
}
