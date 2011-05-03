class Number < ActiveRecord::Base
  def self.new_number
    game = self.find(:last)
    unless game
      game = self.new
    end
    new_number = "%0.2i" %rand(75)
    while game.number.match(new_number)
        new_number = "%0.2i" %rand(75)
    end
    game.number = "#{game.number}, #{new_number}"
    game.save
    return new_number
  end
end
