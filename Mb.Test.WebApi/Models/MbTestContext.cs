using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace Mb.Test.WebApi.Models
{
    public class MbTestContext : DbContext
    {
        public MbTestContext(DbContextOptions<MbTestContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; } = null!;
    }
}
