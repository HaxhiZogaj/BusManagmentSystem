using BusMNG.Models;
using BusMNG.Repositories.Interfaces;
using System.Net.Sockets;

namespace BusMNG.Repositories
{
    public class BiletRepository : Repository<Biletat>, IBiletRepository
    {
        public BiletRepository(BusKosovaContext context) : base(context) { }
    }
}
