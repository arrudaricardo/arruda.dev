import useSWR from "swr";
import { HWComment, HWItem } from "../../pages/hw";
import { ReactNode, useEffect, useState } from "react";
import ItemHeader from "./ItemHeader";
import { sanitize } from "isomorphic-dompurify";
import { useInView } from "react-intersection-observer";

function Header({ id }: { id: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 1 });

  const { data, error } = useSWR<HWItem | HWComment | null>(
    id && inView ? ["/item", id] : null,
    async (api, id) => {
      const res = await fetch(
        `https://hacker-news.firebaseio.com/v0${api}/${id}.json`
      );
      return (await res.json()) as HWItem | HWComment;
    }
  );

  return (
    <div ref={ref} className="user-container">
      <style jsx>{`
        .user-container {
          min-height: 8rem;
          margin: 1rem 0;
          border-radius: 6px;
          background: rgba(51, 170, 51, 0.1);
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
      {!data && !error && <div>Loading ... </div>}
      {error}
      {(data?.type === "story" || data?.type === "job") && (
        <ItemHeader item={data} />
      )}
      <div>
        {data?.type === "comment" && data.text && (
          <>
            <div>Comment:</div>
            <div
              dangerouslySetInnerHTML={{ __html: sanitize(data.text) }}
            ></div>
          </>
        )}
      </div>
    </div>
  );
}

export default function User({ id }: { id: string }) {
  const { data, error } = useSWR<HWUser>(["/user", id], async (api, id) => {
    const res = await fetch(
      `https://hacker-news.firebaseio.com/v0${api}/${id}.json`
    );
    return (await res.json()) as HWUser;
  });

  const [activities, setActivities] = useState<ReactNode[] | null>(null);

  useEffect(() => {
    if (data?.submitted && data.submitted.length > 0) {
      for (const id of data.submitted) {
        const header = <Header id={id} key={id} />;
        setActivities((prev) => [...(prev || []), header]);
      }
    }
  }, [data]);

  return (
    <div className="container">
      <style jsx>{`
        .about {
          border-radius: 6px;
          background: rgba(51, 110, 101, 0.4);
        }
        .container {
          display: flex;
          justify-content: center;
          flex-direction: column;
          margin: 0 20vw;
        }
        .activities-container {
          margin-top: 1rem;
        }
      `}</style>
      {data ? (
        <div>
          <h1>{id}</h1>
          <div>
            <p>
              karma: <span> {data.karma}</span>
            </p>
            {data.about && (
              <>
                <h3>about:</h3>
                <div
                  className="about"
                  dangerouslySetInnerHTML={{ __html: sanitize(data.about) }}
                ></div>
              </>
            )}
            <div className="activities-container">
              {activities && <h3>Activity:</h3>}
              {activities?.map((story) => story)}
            </div>
          </div>
        </div>
      ) : (
        <div>Loading</div>
      )}
      {error && <div>Could not find user</div>}
    </div>
  );
}

interface HWUser {
  id: string;
  delay?: number;
  created: number;
  karma: number;
  about?: string;
  submitted?: number[];
}
