using Microsoft.EntityFrameworkCore;

namespace Mb.Test.WebApi.Models
{
    public class MbTestContext : DbContext
    {
        public MbTestContext(DbContextOptions<MbTestContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<User> Users { get; set; } = null!;
    }
}
