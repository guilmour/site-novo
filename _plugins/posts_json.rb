require 'json'

module Jekyll
  module PostsJSON
    include VideoEmbeded

    def generate_json(obj, stdout=false)
      Array(obj).flatten[0..500].map do |post|
        result = {
          title: post.data['title'],
          url: post.url,
          date: post.data['date'],
          support_line: post.data['support_line']
        }

        if not post.data['images_hd'].nil?
          result[:cover] = post.data['images_hd']
        else
          result[:video] = get_video_embeded(post.data['video'])
        end

        result
      end.to_json
    end

  end
end

Liquid::Template.register_filter(Jekyll::PostsJSON)
