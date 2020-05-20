using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hacker_News_.NET_with_React.Models
{
    public class ListItemModel
    {
        public string by { get; set; }
        public string descendants { get; set; }
        public int id { get; set; }
        public string[] kids { get; set; }
        public int score { get; set; }
        public int time { get; set; }
        public string title { get; set; }
        public string type { get; set; }
        public string url { get; set; }
        public string text { get; set; }
    }
}
