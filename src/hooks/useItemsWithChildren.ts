import { useCallback, useState, useEffect } from 'react';

import { useSource } from 'hooks/useSource';

export function useItemsWithChildren<Item extends { id: string }, Child>(
  itemsSource: () => Promise<Item[]>,
  childrenSource: (item: Item) => Promise<Child[]>,
  opened?: any[],
  setOpened?: (items: any[]) => void,
  deps?: any[],
) {
  const { data: entities } = useSource(() => itemsSource(), []);
  const [childs, setChilds] = useState<Record<string, Entry<Child, any>[] | undefined>>({});

  const [items, setItems] = useState<Entry<Item, Child>[]>();

  const toggle = useCallback((item: Item) => {
    if (!childs[item.id]) {
      childrenSource(item).then((items) => {
        // @ts-ignore
        setChilds((childs) => ({
          ...childs,
          [item.id]: items.map((i) => ({ item: { ...i, parent: item.id }, open: () => void 0 })),
        }));
      });
    } else {
      setChilds((childs) => ({ ...childs, [item.id]: undefined }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setItems(entities?.map((item) => ({ item, isParent: true, open: () => toggle(item) })));
  }, [entities, toggle]);

  useEffect(() => {
    setOpened?.(Object.keys(childs));
  }, [childs, setOpened]);

  useEffect(() => {
    opened?.map((i) => toggle(entities?.find((j) => j.id === i)!));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps || []);

  return items?.reduce<(Entry<Item, Child> | Entry<Child, any>)[]>((collection, item) => {
    // @ts-ignore
    return [...collection, item, ...(childs[item.item.id] || [])];
  }, []);
}

export interface Entry<Item, Child> {
  item: Item | Child;
  open?: () => void;
  childs?: Entry<Child, any>[];
  isParent?: boolean;
}
