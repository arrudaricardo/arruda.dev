import { HWItem } from "../../pages/hw";
import ItemHeader from "./ItemHeader";
import { sanitize } from "isomorphic-dompurify";
import Comment from "./Comment";
import styles from "./Item.module.css";
import Layout from "../ParticlesLayout";

export default function Item({ item }: { item: HWItem }) {
  return (
    <Layout title={item.title || ""}>
      <div className={styles["container"]}>
        <div className={styles["item-header"]}>
          <ItemHeader item={item} />
        </div>
        {"text" in item && item.text && (
          <p dangerouslySetInnerHTML={{ __html: sanitize(item.text) }}></p>
        )}
        {"kids" in item &&
          item.kids &&
          item.kids.length > 0 &&
          item.kids.map((id) => {
            return <Comment id={id} key={id} />;
          })}
      </div>
    </Layout>
  );
}
