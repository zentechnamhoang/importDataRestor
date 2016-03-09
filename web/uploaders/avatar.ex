defmodule RestaurantImportInfo.Avatar do
  use Arc.Definition

  @versions [:original, :thumb]
  @extension_whitelist ~w(.jpg .jpeg .gif .png)

  def acl(:thumb, _), do: :public_read

  def validate({file, _}) do   
    file_extension = file.file_name |> Path.extname |> String.downcase
    Enum.member?(@extension_whitelist, file_extension)
  end

  #def transform(:thumb, _) do
  #  {:convert, "-thumbnail 100x100^ -gravity center -extent 100x100 -format png", :png}
  #end

  #def filename(version, _) do
  #  version
  #end
  
  def __storage, do: Arc.Storage.Local

  def storage_dir(_, {file, scope}) do
    "uploads/avatars/#{scope.id}"
  end
end

