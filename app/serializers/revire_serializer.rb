# frozen_string_literal: true

class RevireSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :description, :score, :airline_id
end
