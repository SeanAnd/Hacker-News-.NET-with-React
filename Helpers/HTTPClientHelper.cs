using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace Hacker_News_.NET_with_React.Helpers
{
    public class HTTPClientHelper
    {
        // *Slap's function* this baby returns the client
        public HttpClient Initialize()
        {
            var httpClient = new HttpClient();
            httpClient.BaseAddress = new Uri("https://hacker-news.firebaseio.com/v0/");
            return httpClient;
        }
    }
}
