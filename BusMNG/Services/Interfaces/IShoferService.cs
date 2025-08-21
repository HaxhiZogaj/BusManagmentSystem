using BusMNG.DTOs;
using BusMNG.ViewModels;

namespace BusMNG.Services.Interfaces
{
    public interface IShoferService
    {
        Task<IEnumerable<ShoferetViewModel>> GetAllDrivers();
        Task<ShoferetViewModel> GetDriverById(int id);
        Task AddDriver(ShoferetViewModel shoferetViewModel);
        Task UpdateDriver(ShoferetViewModel shoferetViewModel);
        Task DeleteDriver(int id);

        Task<IEnumerable<ShoferDto>> SelectForDropdownAsync();

    }
}
