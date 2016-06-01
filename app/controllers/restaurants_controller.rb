class RestaurantsController < ApplicationController

  def index
    
  end


  def search
    @results = Yelp.client.search(params[:search])
    # headers("Content-Type" => "application/json")
    # erb @results.as_json
    render :json => @results
  end

end
