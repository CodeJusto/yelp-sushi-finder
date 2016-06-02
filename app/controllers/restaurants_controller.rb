class RestaurantsController < ApplicationController

  def index
  end


  def search
    location = "#{params[:location]}"
    extras = { term: params[:search], limit: params[:limit], cc: params[:country]}
    # binding.pry
    @results = Yelp.client.search(location, extras)
    # headers("Content-Type" => "application/json")
    # erb @results.as_json
    render :json => @results
  end

end
