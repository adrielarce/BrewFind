**How long did you spend on the coding assignment? What would you add to your
solution if you had more time? If you didn&#39;t spend much time on the coding test
then use this as an opportunity to explain what you would add.**

This application took me 2 days of development time to complete. One useful feature that I immediately knew I wanted to add was a mapping function. Since the API gives address and geographical location of the breweries, I think that a feature that lets users to search for breweries based on proximity to their location would give this app a lot more utility.

**What was the most useful feature that was added to the latest version of your
chosen language? Please include a snippet of code that shows how you&#39;ve used
it.**

One of the most useful features added to a recent version of React.js was the introduction of hooks. These allow React functional components to have state, without implementing a class component. In my opinion, these are very useful because they allow for, in most cases where state is required, cleaner and simpler code.

An example:
```
const [goals, setGoals] = useState([]);

useEffect(() => {
    if (program.goals)
        setGoals(program.goals);
    else
        setGoals([]);
}, [program]);
```
**How would you track down a performance issue in production? Have you ever
had to do this?**

If presented with a performance issue, and with no other context available, I would first check the application's error logs, if available. If not present, I would monitor the network transactions of the application and determine if there are any key transactions that are taking long to complete. Lastly, I would check the application's external dependencies, such as APIs or databases for issues. 

This is a process I have had to complete in my current position. We do tend to log errors for prone processes in our applications, so any performance issue can be narrowed-down through that. However if not logged, the issue is usually tied to high-volume requests that tends to slow performance or a 3rd party service outage.

**How would you improve the API that you just used?**

I found that the API i used was good. One notable absence is the use of a authentication token and any rate limit. If the API were to be heavily used, or even targeted by a DDoS attack, then the performance of the API would be lowered or even experience outages.

**Please describe yourself using JSON.**
```
{
    firstName: "Adriel",
    lastName: "Arce",
    dob: "23-03-1991",
    current_occupation: "Full Stack Developer",
    hobbies: {
        music: ['guitar','keyboard'],
        sports: ['soccer','mountain biking', 'running'],
    }
    education: {
        diplomas: [{
            institute: "Seneca College",
            field: "Computer Programming & Analysis",
        }],
        degrees: [{
            institute: "York University",
            field: "Biology",
        }],
        continued_studies: [{
            insitute: "HackerYou (Juno College)",
            field: "Full Stack Masterclass",
        }],
    },
}
```