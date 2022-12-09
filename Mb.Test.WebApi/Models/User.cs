using System.ComponentModel.DataAnnotations;

namespace Mb.Test.WebApi.Models
{
    public class User
    {
        [Key]
        public int ID { get; set; }
        public UserType UserType { get; set; }
        public string Name { get; set; } = null!;
        public string Surname { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Address { get; set; } = null!;
        public string Telephone { get; set; } = null!;

        public string? PersonCardID { get; set; }
        public DateTime? PersonDOB { get; set; }

        public string? CompanyTaxID { get; set; }
        public string? CompanyContactPerson { get; set; }


    }

    public enum UserType { None, Person, Company }
}
