using BusMNG.DTOs;
using BusMNG.ViewModels;

namespace BusMNG.Services.Interfaces
{
    public interface IPasagjerService
    {
        Task<IEnumerable<PasagjeretViewModel>> GetAllPassengers();
        Task<PasagjeretViewModel> GetPassengerById(int id);
        Task AddPassenger(PasagjeretViewModel pasagjeretViewModel);
        Task UpdatePassenger(PasagjeretViewModel pasagjeretViewModel);
        Task DeletePassenger(int id);

        Task<IEnumerable<PasagjerDto>> SelectForDropdownAsync();
    }
}
