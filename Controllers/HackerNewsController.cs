using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Hacker_News_.NET_with_React.Helpers;
using Hacker_News_.NET_with_React.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Hacker_News_.NET_with_React.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HackerNewsController : ControllerBase
    {
        HTTPClientHelper clientHelper = new HTTPClientHelper();

        [HttpGet, Route("Get")]
        public async Task<IEnumerable<ListItemModel>> Get()
        {
            List<ListItemModel> stories = new List<ListItemModel>();
            HttpClient httpClient = clientHelper.Initialize();
            HttpResponseMessage response = await httpClient.GetAsync("topstories.json?print=pretty");

            if (response.IsSuccessStatusCode)
            {
                //store the response as a string, clean it up, and make an array from it.
                string result = response.Content.ReadAsStringAsync().Result.ToString();
                var chars = new string[] { "]", "[", "\"" };
                foreach (var c in chars)
                {
                    result = result.Replace(c, string.Empty);
                }
                string trimmedResult = result.Trim();
                int[] storyIDs = Array.ConvertAll(trimmedResult.Split(','), int.Parse);

                //it puts the reponse in the list and does what it's told or else it gets the loop again.
                foreach (int id in storyIDs)
                {
                    HttpResponseMessage newResponse = await httpClient.GetAsync("item/" + id + ".json?print=pretty");
                    if (newResponse.IsSuccessStatusCode)
                    {
                        var storyResult = newResponse.Content.ReadAsStringAsync().Result;
                        stories.Add(JsonConvert.DeserializeObject<ListItemModel>(storyResult));
                    }
                }
            }
            return stories.ToArray();
        }

        //[HttpGet, Route("Details/{id}")]
        //public async Task<ListItemModel> Details(int? id)
        //{
        //    ListItemModel story = new ListItemModel();
        //    HttpClient httpClient = clientHelper.Initialize();
        //    HttpResponseMessage response = await httpClient.GetAsync("item/" + id + ".json?print=pretty");

        //    if (response.IsSuccessStatusCode)
        //    {
        //        var result = response.Content.ReadAsStringAsync().Result;
        //        story = JsonConvert.DeserializeObject<ListItemModel>(result);
        //    }

        //    return story;
        //}
    }
}