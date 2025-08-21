using BusMNG.DTOs;
using BusMNG.ViewModels;
using System.Net.Sockets;

namespace BusMNG.Services.Interfaces
{
    public interface IBiletService
    {
        Task<IEnumerable<BiletatViewModel>> GetAllTickets();
        Task<BiletatViewModel> GetTicketById(int id);
        Task AddTicket(BiletatViewModel biletatviewmodel);
        Task UpdateTicket(BiletatViewModel biletatviewmodel);
        Task DeleteTicket(int id);

        //Task<IEnumerable<BiletDto>> SelectForDropdownAsync();

        Task<IEnumerable<RezervimDto>> SelectForRezervimDropdownAsync();


    }
}
