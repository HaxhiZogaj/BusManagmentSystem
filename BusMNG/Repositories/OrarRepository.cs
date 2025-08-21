using BusMNG.Models;
using BusMNG.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Syncfusion.EJ2.Schedule;

namespace BusMNG.Repositories
{
    public class OrarRepository : Repository<Oraret>, IOrarRepository
    {
        public OrarRepository(BusKosovaContext context) : base(context) { }
    }
}
