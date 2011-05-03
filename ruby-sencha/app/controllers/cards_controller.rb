class CardsController < ApplicationController
	def index
		@cards = Card.find(:all, :order => "max_connect desc")
	end
	
	def new_number
	  @new_number = "%.2i" %Card.new_game_number
	  @old_number = Number.find(:last).number
	  @cards = Card.find(:all, :order => "max_connect desc")
  end
  
  def new_game
    Card.find(:all).each do |card|
      card.set_result_to_default
      card.max_connect = 0
      card.save
    end
    number = Number.find(:last)
    number.number = ""
    number.save
    redirect_to :action => :index
  end
end
