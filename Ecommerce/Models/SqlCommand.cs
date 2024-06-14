using System.Data;

namespace Ecommerce.Models
{
    internal class SqlCommand
    {
        public SqlConnection? Connection { get; internal set; }
        public required object Parameters { get; internal set; }
        public string CommandText { get; internal set; }
        public CommandType CommandType { get; internal set; }
        public int CommandTimeout { get; internal set; }

        internal void Dispose()
        {
            throw new NotImplementedException();
        }
    }
}