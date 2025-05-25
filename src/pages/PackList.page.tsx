import { CardAlternativesSelector } from "@/components/CardTable/CardTable";
import { PitchIndicator } from "@/components/PitchIndicator/PitchIndicator";
import { RarityIndicator } from "@/components/RarityIndicator/RarityIndicator";
import { PackModel } from "@/Models/Pack.model";
import { useAppStore } from "@/Store/store";
import { AppShell, Button, Container, Group, ScrollArea, Stack, Table, Title, Text, Space } from "@mantine/core";
import { IconDownload, IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { NavLink, replace, useNavigate } from "react-router";

export function PackList() {

  const navigate = useNavigate()

  const packs = useAppStore((state) => state.packDatabase)
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

  const rows = packs.values().map((pack, index) => {
    // const selected = selection.includes(keyForCard(item, index));
    return (
      <Table.Tr key={pack.id}>
        <Table.Td>{pack.cards.length}</Table.Td>
        <Table.Td>{pack.boxId}</Table.Td>
        <Table.Td>{pack.id}</Table.Td>
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
        <Title>Packs</Title>
        <Group justify="flex-end">
          <Button onClick={() => handleDownload()} variant='outline'>
            <Group gap='xs'>
              <IconDownload size={16}/>
              <Text>Download</Text>
            </Group>
          </Button>
          <Button onClick={() => navigate('/packs/new')}>
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
                <Table.Th>Box Id</Table.Th>
                <Table.Th>Pack Id</Table.Th>
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
