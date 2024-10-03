using ProjektZespolowy.API.Models.Work;
using Microsoft.EntityFrameworkCore;

namespace ProjektZespolowy.API.Models.User
{
    public class WorkDbContext : DbContext
    {
        public WorkDbContext(DbContextOptions<WorkDbContext> options) : base(options)
        {
        }

        public DbSet<KanbanTask> KanbanTasks { get; set; }
    }
}
