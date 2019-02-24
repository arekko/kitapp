export interface Thumbnails {
  w160: string;
  w320: string;
  w640: string;
}

export interface Media {
  file_id: number;
  tag: string;
  filename: string;
  filesize: number;
  title: string;
  description: string;
  user_id: number;
  media_type: string;
  mime_type: string;
  time_added: string;
  screenshot?: string;
  thumbnails?: Thumbnails;
}

export interface Rating {
  rating_id: number;
  rating: number;
  file_id: number;
  user_id: number;
}

export interface Comment {
  comment_id: number;
  comment: string;
  time_added: string;
  file_id: number;
  user_id: number;
}
