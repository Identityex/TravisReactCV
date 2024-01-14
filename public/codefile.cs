using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AggregatorPackage.Shared
{

    /// &lt;summary&gt;
    /// Interface for Reverse Dependency Injection
    /// &lt;/summary&gt;
    internal interface IEventAggregator
    {
        void Subscribe(Type caller, Func&lt;object, Task&lt;object&gt;&gt; onEvent);
        //void Subscribe(Type caller, Func&lt;object, Task&gt; onEvent);
        Task Publish&lt;TCaller&gt;(TCaller publishEvent) where TCaller: class;
        Task&lt;object&gt; PublishWithReturn&lt;TCaller&gt;(TCaller publishEvent) where TCaller : class;
    }

    internal class EventAggregator : IEventAggregator
    {
        private readonly List&lt;object[]&gt; _subscribers = new List&lt;object[]&gt;();

        /// &lt;summary&gt;
        /// Singleton so that no other Aggregator is created
        /// &lt;/summary&gt;
        public static EventAggregator Instance { get; } = new EventAggregator();


        /// &lt;summary&gt;
        /// Subscription for a Task to be run with a return
        /// &lt;/summary&gt;
        /// &lt;param name=&quot;caller&quot;&gt;Class Model for Call&lt;/param&gt;
        /// &lt;param name=&quot;onEvent&quot;&gt;Task that runs and returns&lt;/param&gt;
        public void Subscribe(Type caller, Func&lt;object, Task&lt;object&gt;&gt; onEvent)
        {
            var item = new object[]
            {
                caller, onEvent
            };
            _subscribers.Add(item);
        }

        /// &lt;summary&gt;
        /// Call the subscribed method passing the publish event no return
        /// &lt;/summary&gt;
        /// &lt;typeparam name=&quot;TCaller&quot;&gt;&lt;/typeparam&gt;
        /// &lt;param name=&quot;publishEvent&quot;&gt;Class Model for call&lt;/param&gt;
        public async Task Publish&lt;TCaller&gt;(TCaller publishEvent) where TCaller: class
        {
            var eventRun = _subscribers.FindAll(c=&gt; c[0].Equals(publishEvent.GetType()));

            foreach(object[] obj in eventRun)
            {
                if(obj[1] != null)
                {
                    var myTask = (Func&lt;object, Task&gt;) obj[1];

                    await myTask.Invoke(publishEvent);

                }
            }

        }

        /// &lt;summary&gt;
        /// Call the subscribed method passing the publish event with a return object
        /// &lt;/summary&gt;
        /// &lt;typeparam name=&quot;TCaller&quot;&gt;&lt;/typeparam&gt;
        /// &lt;param name=&quot;publishEvent&quot;&gt;Class Model for call&lt;/param&gt;
        /// &lt;returns&gt;&lt;/returns&gt;
        public async Task&lt;object&gt; PublishWithReturn&lt;TCaller&gt;(TCaller publishEvent) where TCaller : class
        {
            var eventRun = _subscribers.FindAll(c=&gt; c[0].Equals(publishEvent.GetType()));

            object returnObject = null;

            foreach(var obj in eventRun)
            {
                if(obj[1] != null)
                {
                    var runnableTask = (Func&lt;object, Task&lt;object&gt;&gt;) obj[1];

                    returnObject = await runnableTask.Invoke(publishEvent).ConfigureAwait(true);
                }
            }
            return returnObject;
        }
    }
}