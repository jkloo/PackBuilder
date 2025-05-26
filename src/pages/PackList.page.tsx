import { PackModel } from "@/Models/Pack.model";
import { useAppStore } from "@/Store/store";
import { AppShell, Button, Container, Group, ScrollArea, Table, Title, Text, Space } from "@mantine/core";
import { IconBox, IconCards, IconDownload, IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router";

export function PackList({packs, boxId=undefined}: {packs: PackModel[], boxId?: string}) {

  const navigate = useNavigate()

  const deletePack = useAppStore((state) => state.delete)

  const handleDelete = (pack: PackModel) => {
    deletePack(pack)
  }

  const downloadFile = ({ data, fileName, fileType }: { data:string, fileName:string, fileType:string }) => {
    // Create a blob with the data we want to download as a file
    const blob = new Blob([data], { type: fileType })
    // Create an anchor element and dispatch a click event on it
    // to trigger a download
    const a = document.createElement('a')
    a.download = fileName
    a.href = window.URL.createObjectURL(blob)
    const clickEvt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    })
    a.dispatchEvent(clickEvt)
    a.remove()
  }

  const handleDownload = () => {
    downloadFile({
      data: JSON.stringify(packs.values().toArray()),
      fileName: 'packs.json',
      fileType: 'text/json',
    })
  }

  const rows = packs.map((pack, index) => {
    return (
      <Table.Tr key={pack.id}>
        <Table.Td>{pack.cards.length}</Table.Td>
        <Table.Td>
          <Button onClick={() => navigate(`/packs/${pack.id}`)} variant='default'>
            <Group gap="sm" >
              <IconCards size={16}/>
              <Text>{pack.id}</Text>
            </Group>
          </Button>
        </Table.Td>
        <Table.Td>
          <Button disabled={!!boxId} onClick={() => navigate(`/boxes/${pack.boxId}`)} variant='default'>
            <Group gap="sm" >
              <IconBox size={16}/>
              <Text>{pack.boxId}</Text>
            </Group>
          </Button>
          
        </Table.Td>
        <Table.Td>
          <Group justify='right'>
            <Button variant="light" color="red" onClick={() => handleDelete(pack)}>
              <IconTrash size={24} stroke={1.5}/>
            </Button>
            <Button variant="light" onClick={() => navigate(`/packs/${pack.id}/edit`)}>
              <IconEdit size={24} stroke={1.5}/>
            </Button>
          </Group>
        </Table.Td>
      </Table.Tr>
    );
  });


  return (
    <>
    <AppShell.Main>
      <Container>
        <Title>{boxId ? `Packs in Box (${boxId})` : 'Packs' }</Title>
        <Group justify="flex-end">
          <Button onClick={() => handleDownload()} variant='outline'>
            <Group gap='xs'>
              <IconDownload size={16}/>
              <Text>Download</Text>
            </Group>
          </Button>
          <Button onClick={() => navigate(boxId ? `/packs/new?boxId=${boxId}` : '/packs/new')}>
            <Group gap='xs'>
              <IconPlus size={16}/>
              <Text>New</Text>
            </Group>
          </Button>
        </Group>
        <Space h='lg'/>
        <ScrollArea>
          <Table miw={640} verticalSpacing="sm">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Card Count</Table.Th>
                <Table.Th>Pack Id</Table.Th>
                <Table.Th>Box Id</Table.Th>
                <Table.Th></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </ScrollArea>
      </Container>
    </AppShell.Main>
    </>
  );
}
