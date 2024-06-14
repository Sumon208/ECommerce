
namespace Ecommerce.Models
{
    internal class SqlConnection
    {
        public SqlConnection(string connString)
        {
        }

        internal void Close()
        {
            throw new NotImplementedException();
        }

        internal SqlCommand CreateCommand()
        {
            throw new NotImplementedException();
        }

        internal void Open()
        {
            throw new NotImplementedException();
        }
    }
}