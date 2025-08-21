using BusMNG.DTOs;
using BusMNG.Models;
using BusMNG.ViewModels;

namespace BusMNG.Services.Interfaces
{
    public interface IBusService
    {
        Task<IEnumerable<BusViewModel>> GetAllBuses();
        Task<BusViewModel> GetBusById(int id);
        Task AddBus(BusViewModel busviewmodel);
        Task UpdateBus(BusViewModel busviewmodel);
        Task DeleteBus(int id);

        Task<IEnumerable<BusDto>> SelectForDropdownAsync();
    }
}
