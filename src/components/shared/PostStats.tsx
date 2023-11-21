import { Models } from "appwrite";	

type PostStatsProps = {
    post: Models.Document;
    userId: string;
}

const PostStats = ({post,userId}: PostStatsProps) => {
  return (
    <div className='z-20 flex items-center justify-between'>    
        <div className="flex gap-2 mr-5">
            <img src="/assets/icons/liked.svg" 
            alt="like" 
            width={20} 
            height={20}
            onClick={() => {}}
            className="cursor-pointer"
            ></img>
            <p className="small-medium lg:base-medium">0</p>
        </div>
        <div className="flex gap-2">
            <img src="/assets/icons/save.svg" 
            alt="like" 
            width={20} 
            height={20}
            onClick={() => {}}
            className="cursor-pointer"
            ></img>
        </div>
    </div>
  )
}

export default PostStats
