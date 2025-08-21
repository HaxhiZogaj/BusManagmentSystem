using BusMNG.DTOs;
using BusMNG.ViewModels;

namespace BusMNG.Services.Interfaces
{
    public interface IRezervimService
    {
        Task<IEnumerable<RezervimetViewModel>> GetAllBookings();
        Task<RezervimetViewModel> GetBookingById(int id);
        Task AddBooking(RezervimetViewModel rezervimetViewModel);
        Task UpdateBooking(RezervimetViewModel rezervimetViewModel);
        Task DeleteBooking(int id);

        Task<IEnumerable<RezervimDto>> SelectForRezervimDropdownAsync();

    }
}
