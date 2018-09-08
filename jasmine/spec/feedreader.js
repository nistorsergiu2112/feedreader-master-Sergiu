/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('URLs are defined', function () {
            for (var i = 0; i<allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            };
        });
        it('Names are defined', function () {
            for (var i = 0; i<allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            };
        });        
    });
    /* New test suite that will test the menu */
    describe('The menu', function () {
        /* 
         * Test that ensures the menu element is
         * hidden by default.
         */
        it('menu is hidden', function () {
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        });
         /* 
          * Test that ensures the menu changes
          * visibility when the menu icon is clicked.
          */
        it('working toggle when clicked', function () {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });
    /* 
     * New test suite that ensures when the loadFeed 
     * function is called and completes its work,
     * there is at least a single .entry element
     */
    describe('Initial Entries', function () {
    
        beforeEach(function (done) {
            loadFeed(0, done);
        });

        it('at least one entry', function () {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });
    /* New test suite that tests when a new feed is loaded by the loadFeed
     * function that the content actually changes. */
    describe('New Feed Selection', function() {
        var firstFeed, secondFeed;
        
        beforeEach(function(done) {
            loadFeed(1, function() {
              /* Console message when the first feed loaded */
                console.log('First feed loaded!')

                firstFeed = $('.feed').html();
                loadFeed(2, function() {

                  /* Console message when the second feed loaded */
                    console.log('Second feed loaded!')
                    done();
                });
            });        
         });
        
        afterEach(function() {
            loadFeed(0);
        });
        /* Test that ensures the feeds are different */
        it('checks if two feeds are different', function() {

            secondFeed = $('.feed').html();
            expect(firstFeed).not.toEqual(secondFeed);
        }); 
    });
}());
