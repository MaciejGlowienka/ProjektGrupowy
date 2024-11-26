using ProjektZespolowy.API.Helpers.User;
using ProjektZespolowy.API.Models.User;
using ProjektZespolowy.API.Models.Work;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ProjektZespolowy.API.Services
{
    public class TaskService : ITaskService
    {
       
        private readonly WorkDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public TaskService(WorkDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        private string GetCurrentUsername()
        {
            return _httpContextAccessor.HttpContext.User?.Identity?.Name;
        }

        public async Task<Dictionary<string, Column>> GetKanbanTasks()
        {
            var currentUsername = GetCurrentUsername();


            var tasks = await _context.KanbanTasks
                .Where(t => t.Username == currentUsername)
                .ToListAsync();

            var columnsDictionary = Enum.GetValues(typeof(Models.Work.TaskStatus))
                .Cast<Models.Work.TaskStatus>()
                .ToDictionary(
                    status => Enum.GetName(typeof(Models.Work.TaskStatus), status),
                    status =>
                    {
                        var tasksForStatus = tasks.Where(t => (Models.Work.TaskStatus)t.Status == status).ToList();
                        return new Column
                        {
                            Title = $"Status {status}",
                            Status = (int)status,
                            Items = tasksForStatus
                        };
                    });

            return columnsDictionary;
        }

        public async Task<KanbanTask> GetKanbanTaskByIdAsync(int id)
        {
 
            var currentUsername = GetCurrentUsername();
            Console.WriteLine(currentUsername);
            
            //Went żeby sprawdzać działanie api - DO USUNIĘCIA
            //if (currentUsername == null)
            //{
            //    currentUsername = "no user";
            //}

            return await _context.KanbanTasks
                .FirstOrDefaultAsync(x => x.ID == id && x.Username == currentUsername);
        }

        public async Task<KanbanTask> CreateKanbanTaskAsync(KanbanTask kanbanTask)
        {
            kanbanTask.Username = GetCurrentUsername();

            //Went żeby sprawdzać działanie api - DO USUNIĘCIA
            //if (kanbanTask.Username == null)
            //{
            //    kanbanTask.Username = "no user";
            //}

            _context.KanbanTasks.Add(kanbanTask);
            await _context.SaveChangesAsync();
            return kanbanTask;
        }

        public async Task<bool> EditKanbanTaskAsync(int id, KanbanTask kanbanTask)
        {
            var currentUsername = GetCurrentUsername();

            if (id != kanbanTask.ID || kanbanTask.Username != currentUsername)
                return false;

            _context.Entry(kanbanTask).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!KanbanTaskExists(id, currentUsername))
                    return false;
                else
                    throw;
            }

            return true;
        }

        public async Task<bool> EditKanbanTaskStatusAsync(List<KanbanTaskStatusSaveRequest> request)
        {
            var currentUsername = GetCurrentUsername();

            foreach (var item in request)
            {
                var task = await _context.KanbanTasks
                    .FirstOrDefaultAsync(x => x.ID == item.ID && x.Username == currentUsername);

                if (task != null)
                    task.Status = item.Status;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }

            return true;
        }

        public async Task<bool> DeleteKanbanTaskByIdAsync(int id)
        {
            var currentUsername = GetCurrentUsername();


            var kanbanTask = await _context.KanbanTasks
                .FirstOrDefaultAsync(x => x.ID == id && x.Username == currentUsername);

            if (kanbanTask == null)
                return false;

            _context.KanbanTasks.Remove(kanbanTask);
            await _context.SaveChangesAsync();

            return true;
        }

        private bool KanbanTaskExists(int id, string username)
        {
            return _context.KanbanTasks.Any(x => x.ID == id && x.Username == username);
        }
    }
}
