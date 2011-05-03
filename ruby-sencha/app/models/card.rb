class Card < ActiveRecord::Base
  
  def new_number
    is_duplicate = true
    while is_duplicate == true
      self.numbers = Card.random_all
      unless Card.find_by_numbers(self.numbers)
        is_duplicate = false
      end
    end
  end
  
  def number_as_table
    ns = self.number_in_array
    puts ns[ 0.. 4].join(', ')
    puts ns[ 5.. 9].join(', ')
    puts ns[10..14].join(', ')
    puts ns[15..19].join(', ')
    puts ns[20..24].join(', ')
  end
  
  def number_result_as_array
    numbers = number_as_array
    results = result_as_array
    totals = []
    i = 0;
    numbers.each do |n|
      totals << {:number => n, :result => results[i]}
      i=i+1;
    end
    return totals
  end
  
  def add_number(number)
    set_result_to_default if self.results == nil
    self.results = self.results.gsub("%.2i" %number,"check")
  end
  
  def is_bingo
    a_results = result_as_array
    max = 0
    count_a = 0
    count_b = 0
    
    #check versical and horizontal
    (0..4).each do |i|
      (0..4).each do |j|
        count_a = count_a + 1 if a_results[i*5+j] == "check"
        count_b = count_b + 1 if a_results[j*5+i] == "check"
      end
      return true if (count_a == 5 || count_b == 5)
      max = count_a if count_a > max
      max = count_b if count_b > max
      count_a = 0
      count_b = 0
    end
      
    #check cross right and left
    (0..4).each do |i|
      count_a = count_a + 1 if a_results[i*5+i] == "check"
      count_b = count_b + 1 if a_results[i*5+(4-i)] == "check"
    end
    if (count_a == 5 || count_b == 5)
      self.max_connect = 5
      return true 
    end
    max = count_a if count_a > max
    max = count_b if count_b > max
    self.max_connect = max
    return false
  end
  
  def set_result_to_default
    self.results = self.numbers
    self.results = self.results.gsub("00","check")
  end  
  
private

  def number_as_array
    if numbers
      return numbers.gsub(" ","").split(",")
    else
      return []
    end
  end

  def result_as_array
    if results
      return results.gsub(" ","").split(",")
    else
      return []
    end
  end

  def self.new_game_number
    new_number = Number.new_number
    Card.find(:all).each do |card|
      card.add_number(new_number)
      card.is_bingo
      card.save
    end
    return new_number
  end

  def self.random_all
    all_number = []
    5.times do |i|
      j = 0
      Card.random_15_number.each do |n|
        all_number[i + 5*j] = "%.2i" %(n + (15*i))
        j = j + 1
      end
    end
    all_number[12] = "00"
    return all_number.join(', ')
  end
  
  def self.random_15_number
    list_of_number = 15.times.map{|x| x+1 }
    30.times do |i|
      position_a = rand(15)
      position_b = rand(15)
      list_of_number[position_a], list_of_number[position_b] = 
        list_of_number[position_b], list_of_number[position_a]
    end
    return list_of_number[0..4]
  end
end
