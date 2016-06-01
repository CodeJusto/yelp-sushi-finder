# require 'yelp'

# client = Yelp::Client.new({ consumer_key: ENV["YOUR_CONSUMER_KEY"],
#                             consumer_secret: ENV["YOUR_CONSUMER_SECRET"],
#                             token: ENV["YOUR_TOKEN"],
#                             token_secret: ENV["YOUR_TOKEN_SECRET"]
#                           })

require 'yelp'

Yelp.client.configure do |config|
  config.consumer_key = ENV["YELP_CONSUMER_KEY"]
  config.consumer_secret = ENV["YELP_CONSUMER_SECRET"]
  config.token = ENV["YELP_TOKEN"]
  config.token_secret = ENV["YELP_TOKEN_SECRET"]
end

Yelp.client.search('San Francisco', { term: 'food' })
